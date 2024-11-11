import { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { useSearchQueryReaderContext } from '../SearchResultsContext';

const PREFIX = 'SearchExplainer';

const Root = styled('div')(({ theme }) => ({
    marginLeft: '0.5em',
    marginRight: '0.5em',
    [`& .${PREFIX}-divider`]: {
        borderColor: theme.palette.primary.main,
        marginTop: 20,
        marginBottom: 4
    },
    [`& .${PREFIX}-header`]: {
        textAlign: 'center'
    },
    [`& .${PREFIX}-spacing`]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

function SearchExplainer() {
    const reader = useSearchQueryReaderContext();
    const query = reader.query;
    const queryChips = [];

    // Decompose the query into its roots: what are we searching on?
    if (query !== undefined) {
        Object.keys(query).forEach((key) => {
            if (key !== undefined && query[key] !== undefined) {
                const repl = query[key].replaceAll('|', ' OR ');
                queryChips.push([key, repl]);
            }
        });
    }

    return useMemo(
        () => (
            <Root>
                {/* Header */}
                <Box sx={{ border: 1, borderRadius: 2, borderColor: 'white' }}>
                    {queryChips.flatMap((chip) => [' AND ', <Chip key={chip[0]} label={`${chip[0]}: ${chip[1]}`} />]).slice(1)}
                </Box>
            </Root>
        ),
        [reader.donorID]
    );
}

export default SearchExplainer;
