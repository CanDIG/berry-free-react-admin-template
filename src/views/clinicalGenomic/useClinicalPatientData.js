import { useEffect, useState } from 'react';
import { useSidebarWriterContext } from '../../layout/MainLayout/Sidebar/SidebarContext';
import { fetchFederation } from '../../store/api';
import PatientSidebar from './widgets/patientSidebar';

/*
 * Custom hook to fetch and manage clinical patient data.
 * @param {string} patientId - The ID of the patient.
 * @param {string} programId - The ID of the program.
 * @returns {Object} - An object containing data, rows, columns, title, and topLevel.
 */
function useClinicalPatientData(patientId, programId) {
    // Access the SidebarContext to update the sidebar with patient information
    const sidebarWriter = useSidebarWriterContext();

    // State variables to store fetched data, table rows, columns, title, and topLevel data
    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [title, setTitle] = useState('');
    const [topLevel, setTopLevel] = useState({});

    function filterNestedObject(obj) {
        return Object.fromEntries(
            Object.entries(obj).filter(
                ([key, value]) =>
                    value !== null &&
                    !(
                        (Array.isArray(value) && value.length === 0) || // Exclude empty arrays
                        value === '' ||
                        key === ''
                    ) &&
                    (!(typeof obj[key] === 'object') || (typeof obj[key] === 'object' && 'month_interval' in obj[key])) // Accept interval date objects remove all other objects
            )
        );
    }

    // useEffect to fetch data when patientId, programId, or sidebarWriter changes
    useEffect(() => {
        // Asynchronous function to fetch data
        const fetchData = async () => {
            try {
                // Construct the API URL based on the provided parameters
                if (programId && patientId) {
                    const url = `v2/authorized/donor_with_clinical_data/program/${programId}/donor/${patientId}`;

                    const result = await fetchFederation(url, 'katsu');
                    // Extract patientData from the fetched result or use an empty object
                    const patientData = result[0].results || {};
                    // Filter patientData to create topLevel data excluding arrays, objects, and empty values
                    const filteredData = filterNestedObject(patientData);
                    const ageInMonths = filteredData.date_of_death.month_interval - filteredData.date_of_birth.month_interval;
                    filteredData.age_at_death = Math.floor(ageInMonths / 12);
                    filteredData.age_at_first_diagnosis = Math.floor(-filteredData.date_of_birth.month_interval / 12);
                    delete filteredData.date_of_death;
                    delete filteredData.date_of_birth;

                    setTopLevel(filteredData);
                    setData(patientData);
                    // Update the sidebar with patientData using the PatientSidebar component
                    sidebarWriter(
                        <PatientSidebar
                            sidebar={patientData}
                            setRows={setRows}
                            setColumns={setColumns}
                            setTitle={setTitle}
                            ageAtFirstDiagnosis={filteredData.age_at_first_diagnosis}
                            resolution={filteredData.date_resolution}
                        />
                    );
                }
            } catch (error) {
                console.error('Error fetching clinical patient data:', error);
            }
        };

        fetchData();
    }, [patientId, programId, sidebarWriter]);

    return { data, rows, columns, title, topLevel };
}

export default useClinicalPatientData;
