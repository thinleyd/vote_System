import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import FontFamily from './FontFamily';
import BoxContainer from './BoxContainer';
import PresetColor from './PresetColor';
import Layout from './Layout';
import InputFilled from './InputFilled';
import BorderRadius from './BorderRadius';
import ThemeModeLayout from './ThemeMode';
import SidebarDrawer from './SidebarDrawer';
import MenuOrientation from './MenuOrientation';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useConfig from 'hooks/useConfig';

// assets
import { IconSettings, IconPlus, IconTextSize, IconColorSwatch } from '@tabler/icons-react';
import { ThemeMode } from 'config';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number,
    index: PropTypes.number
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

a11yProps.propTypes = {
    index: PropTypes.number
};

const Customization = () => {
    const theme = useTheme();
    const { mode, onReset } = useConfig();

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customizes">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: 1200,
                        boxShadow: theme.customShadows.secondary
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple aria-label="live customize">
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer anchor="right" onClose={handleToggle} open={open} PaperProps={{ sx: { width: 375 } }}>
                {open && (
                    <PerfectScrollbar>
                        <MainCard content={false} border={false}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5} sx={{ p: 2.5 }}>
                                <Typography variant="h5">Theme Customization</Typography>
                                <Stack direction="row" alignItems="center" spacing={1.25}>
                                    <Button variant="outlined" color="error" size="small" onClick={() => onReset()}>
                                        Reset
                                    </Button>
                                    <IconButton sx={{ p: 0, color: 'grey.600' }} onClick={handleToggle}>
                                        <IconPlus size={24} style={{ transform: 'rotate(45deg)' }} />
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={value}
                                    sx={{
                                        bgcolor: mode === ThemeMode.DARK ? 'dark.800' : 'grey.50',
                                        minHeight: 56,
                                        '& .MuiTabs-flexContainer': { height: '100%' }
                                    }}
                                    centered
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label={<IconColorSwatch />} {...a11yProps(0)} sx={{ width: '50%' }} />
                                    <Tab label={<IconTextSize />} {...a11yProps(1)} sx={{ width: '50%' }} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12}>
                                        {/* layout type */}
                                        <ThemeModeLayout />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Theme Preset Color */}
                                        <PresetColor />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Input Background */}
                                        <InputFilled />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Theme Width */}
                                        <BoxContainer />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Theme Layout */}
                                        <Layout />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Sidebar Drawer */}
                                        <SidebarDrawer />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Menu Orientation */}
                                        <MenuOrientation />
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {/* font family */}
                                        <FontFamily />
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* border radius */}
                                        <BorderRadius />
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </CustomTabPanel>
                        </MainCard>
                    </PerfectScrollbar>
                )}
            </Drawer>
        </>
    );
};

export default Customization;
