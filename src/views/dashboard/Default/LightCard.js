import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// ===========================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||=========================== //

const LightCard = ({ isLoading, header, value, icon, color = 'grey' }) => {
    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: '#fff',
            color: theme.palette[color].light,
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
                content: '""',
                position: 'absolute',
                width: '210px',
                height: '210px',
                background: `linear-gradient(210.04deg, ${theme.palette[color].dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
                borderRadius: '50%',
                top: '-30px',
                right: '-180px'
            },
            '&:before': {
                content: '""',
                position: 'absolute',
                width: '210px',
                height: '210px',
                background: `linear-gradient(140.9deg, ${theme.palette[color].dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
                borderRadius: '50%',
                top: '-160px',
                right: '-130px'
            }
        },
        content: {
            padding: '16px !important'
        },
        avatar: {
            ...theme.typography.commonAvatar,
            ...theme.typography.largeAvatar,
            backgroundColor: theme.palette[color].dark,
            color: '#fff'
        },
        primary: {
            color: '#fff'
        },
        secondary: {
            color: 'black',
            marginTop: '5px'
        },
        padding: {
            paddingTop: 0,
            paddingBottom: 0
        }
    }));

    const classes = useStyles();

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar}>
                                    {icon}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                className={classes.padding}
                                primary={<Typography variant="h4">{header}</Typography>}
                                secondary={
                                    <Typography variant="subtitle2" className={classes.secondary}>
                                        {value}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </MainCard>
            )}
        </>
    );
};

LightCard.propTypes = {
    isLoading: PropTypes.bool,
    header: PropTypes.string,
    value: PropTypes.any,
    icon: PropTypes.any
};

export default LightCard;
