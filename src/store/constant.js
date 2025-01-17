/*
 * All the constants should go on this file
 */

/* Fake Data */

export const diagnosisAgeCount = {
    '0-19 Years': 10,
    '20-29 Years': 20,
    '30-39 Years': 40,
    '40-49 Years': 60,
    '50-59 Years': 50,
    '60-69 Years': 55,
    '70-79 Years': 20,
    '80+ Years': 15
};

export const treatmentTypeCount = {
    Palate: 1,
    'Rectosigmoid junction': 1,
    Tonsil: 3,
    'Other and unspecified parts of mouth': 1,
    Oropharynx: 1,
    'Parotid gland': 2,
    'Other and unspecified parts of tongue': 1,
    'Other and unspecified parts of biliary tract': 1,
    Gum: 3
};

export const primarySiteCount = {
    'Breast C50.9': 50,
    'Ovary C56.9': 5,
    'Trachea C33': 30,
    'Cardia C16.0': 20,
    'Pancreas C25.9': 40,
    'Colon C18': 60,
    'Tonsil C09': 50
};

export const programByNode = {
    BCGSC: {
        POG: 50
    },
    UHN: {
        POG: 67,
        Inspire: 30,
        Biocan: 50,
        Biodiva: 30
    },
    C3G: {
        MOCK: 50
    }
};

export const fullGenomicData = {
    BCGSC: {
        POG: 5
    },
    UHN: {
        POG: 5,
        Inspire: 10,
        Biocan: 5,
        Biodiva: 10
    },
    C3G: {
        MOCK: 20
    }
};

export const fullClinicalData = {
    BCGSC: {
        POG: 10
    },
    UHN: {
        POG: 50,
        Inspire: 10,
        Biocan: 30,
        Biodiva: 20
    },
    C3G: {
        MOCK: 40
    }
};

export const PRIMARY_SITES = ['Breast', 'Trachea', 'Panceas'];

export const PROGRAMS = ['POG', 'Inspire', 'Biocan', 'Biodiva', 'Compass', 'Palms', 'IO-Alines'];

export const CLIN_METADATA = [
    'patients',
    'samples',
    'celltransplants',
    'chemotherapies',
    'complications',
    'consents',
    'diagnoses',
    'enrollments',
    'immunotherapies',
    'labtests',
    'outcomes',
    'radiotherapies',
    'slides',
    'studies',
    'surgeries',
    'treatments',
    'tumourboards'
];
/* End Fake Data */

// Roles
export const SITE = process.env.REACT_APP_SITE_LOCATION;

// API URL where the Dashboard get all the data
export const BASE_URL = process.env.REACT_APP_CANDIG_SERVER;

// Clinical & Genomic Search Page
export const DataVisualizationChartInfo = {
    gender_count: {
        title: 'Gender Distribution',
        xAxis: 'Gender',
        yAxis: 'Number of Patients'
    },
    diagnosis_age_count: {
        title: ' Age at First Diagnosis',
        xAxis: 'Age Range',
        yAxis: 'Number of Patients'
    },
    treatment_type_count: {
        title: 'Treatment Type Distribution',
        xAxis: 'Treatment Type',
        yAxis: 'Number of Treatments'
    },
    primary_site_count: {
        title: 'Tumour Primary Site Distribution',
        xAxis: 'Primary Site',
        yAxis: 'Number of Primary Sites'
    },
    patients_per_program: {
        title: 'Distribution of Program by Node',
        xAxis: 'Site',
        yAxis: 'Number of Patients'
    },
    full_clinical_data: {
        title: 'Complete Clinical',
        xAxis: 'Site',
        yAxis: 'Number of Patients'
    },
    full_genomic_data: {
        title: 'Complete Genomic',
        xAxis: 'Site',
        yAxis: 'Number of Sample Registrations'
    }
};
export const validCharts = ['bar', 'line', 'scatter', 'column'];
export const validStackedCharts = ['patients_per_program', 'full_clinical_data', 'full_genomic_data'];

// Highcharts Map requires a specific set of codes for provinces
// and territories, as represented by hcProvCodes below.
export const hcProvCodes = [
    'ca-ab',
    'ca-bc',
    'ca-mb',
    'ca-nb',
    'ca-nl',
    'ca-nt',
    'ca-ns',
    'ca-nu',
    'ca-on',
    'ca-pe',
    'ca-qc',
    'ca-sk',
    'ca-yt'
];

export const provShortCodes = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
export const provFullNames = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon Territory'
];

// Intial Highcharts state
export const highchartsMapInitialState = {
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    colorAxis: {
        min: 0,
        minColor: '#E6E7E8',
        maxColor: '#005645'
    },
    chart: {
        reflow: true
    },
    yAxis: {
        min: -10000
    },
    xAxis: {
        max: 10000,
        min: -1000
    }
};

// List of referenceNames

export const ListOfReferenceNames = [
    'All',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    'X',
    'Y',
    'MT',
    'chr1',
    'chr2',
    'chr3',
    'chr4',
    'chr5',
    'chr6',
    'chr7',
    'chr8',
    'chr9',
    'chr10',
    'chr11',
    'chr12',
    'chr13',
    'chr14',
    'chr15',
    'chr16',
    'chr17',
    'chr18',
    'chr19',
    'chr20',
    'chr21',
    'chr22',
    'chrX',
    'chrY',
    'chrMT'
];

export const ListOfShortReferenceNames = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    'X',
    'Y',
    'MT'
];

export const ListOfLongReferenceNames = [
    'chr1',
    'chr2',
    'chr3',
    'chr4',
    'chr5',
    'chr6',
    'chr7',
    'chr8',
    'chr9',
    'chr10',
    'chr11',
    'chr12',
    'chr13',
    'chr14',
    'chr15',
    'chr16',
    'chr17',
    'chr18',
    'chr19',
    'chr20',
    'chr21',
    'chr22',
    'chrX',
    'chrY',
    'chrMT'
];

export const BeaconFreqTableColumnDefs = [
    { headerName: 'Chromosome', field: 'referenceName' },
    {
        headerName: 'Position',
        field: 'start',
        cellRenderer(param) {
            return parseInt(param.data.start, 10) + 1;
        }
    },
    { headerName: 'Reference Allele', field: 'referenceBases' },
    {
        headerName: 'Alternate Alleles',
        field: 'alternateBases',
        cellRenderer(param) {
            let alternateBaseRow = '';
            param.data.alternateBases.forEach((alternateBase) => {
                alternateBaseRow += `${alternateBase}<br/>`;
            });
            return alternateBaseRow;
        }
    },
    {
        headerName: 'Allele Frequency',
        field: 'AF',
        cellRenderer(param) {
            let alleleRow = '';
            param.data.AF.substr(1, param.data.AF.length - 2)
                .split(',')
                .forEach((allele) => {
                    alleleRow += `${allele}<br/>`;
                });
            return alleleRow;
        }
    }
];

export const BeaconRangeTableColumnDefs = [
    { headerName: 'Chromosome', field: 'referenceName' },
    {
        headerName: 'Position',
        field: 'start',
        cellRenderer(param) {
            return parseInt(param.data.start, 10) + 1;
        }
    },
    { headerName: 'Reference Allele', field: 'referenceBases' },
    { headerName: 'Exists', field: 'exists' }
];

export const referenceToIgvTrack = {
    hg19: ['hg19', 'hg19a', 'hs37d5', 'grch37', 'grch37-lite'],
    hg38: ['hg38', 'grch38']
};

export default BASE_URL;

// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
