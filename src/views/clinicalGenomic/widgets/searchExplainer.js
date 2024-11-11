import { useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { useSearchQueryReaderContext, useSearchResultsWriterContext } from '../SearchResultsContext';

const PREFIX = 'SearchExplainer';

const Root = styled('div')(({ theme }) => ({
    marginLeft: '0.5em',
    marginRight: '0.5em',
    [`& .${PREFIX}-chiptext`]: {
        textTransform: 'capitalize'
    },
    [`& .${PREFIX}-background`]: {
        padding: '0.5em',
        backgroundColor: theme.palette.primary.light
    },
    [`& .${PREFIX}-chip`]: {
        backgroundColor: 'white'
    }
}));

function SearchExplainer() {
    const reader = useSearchQueryReaderContext();
    const writer = useSearchResultsWriterContext();
    const query = reader.query;
    const queryChips = [];

    // Decompose the query into its roots: what are we searching on?
    if (query !== undefined) {
        Object.keys(query).forEach((key) => {
            if (key !== undefined && query[key] !== undefined) {
                const splitQuery = query[key].split('|');
                const newVal = splitQuery.flatMap((value) => [<b key={value}> OR </b>, value]).slice(1);
                const formattedKey = key.replaceAll('_', ' ');
                newVal.splice(0, 0, <span className={`${PREFIX}-chiptext`}>{formattedKey}: </span>);
                queryChips.push([key, newVal]);
            }
        });
    }

    useEffect(() => {
        writer((old) => ({ ...old, clear: '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reader.donorID]);

    return useMemo(
        () => (
            <Root>
                {/* Header */}
                <Box className={`${PREFIX}-background`}>
                    {queryChips
                        .flatMap((chip) => [
                            <b key={`${chip}b`}> AND </b>,
                            <Chip
                                key={chip[0]}
                                label={chip[1]}
                                onDelete={() => {
                                    writer((old) => ({ ...old, clear: chip[0] }));
                                }}
                                variant="outlined"
                                color="primary"
                                className={`${PREFIX}-chip`}
                            />
                        ])
                        .slice(1)}
                </Box>
            </Root>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [reader.donorID]
    );
}

export default SearchExplainer;
