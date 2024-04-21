import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

export default function DrawerList({ open, toggleDrawer  }) {
    const stopPropagation = (event) => {
        event.stopPropagation();
    };
    return (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem>
                    <Accordion onClick={stopPropagation}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            Categories
                            </AccordionSummary>
                            <AccordionDetails onClick={toggleDrawer(false)}>
                                <List>
                                    <ListItem>
                                        <ListItemButton component={Link} to={`/emotion/love`}>
                                            <ListItemText primary="Love" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton component={Link} to={`/emotion/joy`}>
                                            <ListItemText primary="Joy" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton component={Link} to={`/emotion/surprise`}>
                                            <ListItemText primary="Surprise" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton component={Link} to={`/emotion/anger`}>
                                            <ListItemText primary="Anger" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton component={Link} to={`/emotion/sadness`}>
                                            <ListItemText primary="Sadness" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton component={Link} to={`/emotion/fear`}>
                                            <ListItemText primary="Fear" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                    </Accordion>
                </ListItem>
                
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* Add icon here */}
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={Link} to="/about">
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* Add icon here */}
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItemButton>
                </ListItem>
            </List> 
        </Box>
    );
}
