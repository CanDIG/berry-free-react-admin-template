// assets
import { IconReportSearch } from '@tabler/icons-react';

// import project config
import config from 'config';

// constant
const { basename } = config;

const icons = {
    IconReportSearch
};

// ===========================|| Clinical MENU ITEMS ||=========================== //

const clinicalGenomicSearch = {
    id: 'clinicalGenomicSearch',
    title: 'clinical & Genomic Search',
    type: 'group',
    children: [
        {
            id: 'clinicalGenomicSearch',
            title: 'Clinical & Genomic Search',
            type: 'item',
            url: `${basename}/clinicalGenomicSearch `,
            icon: icons.IconReportSearch,
            breadcrumbs: false
        }
    ]
};

export default clinicalGenomicSearch;
