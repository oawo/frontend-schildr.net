import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import useTableContext from '../../../../hooks/useTable';

const MultiSelectCell = (props) => {
    const { data, width, position } = props;
    const { header, active } = useTableContext();
    const [list, setList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectKey, setSelectKey] = useState("");

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget.parentElement.parentElement)
    };

    const close = async (id, label, color) => {
        setAnchorEl(null);
        setSelectKey("");
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectKey("");
    }

    useEffect(() => {
        const iList = header[position[1]].list.map((e, i) => { e.index = i; return e; });
        setList(iList);
    }, [header, position, data.data]);

    return (
        <>
            {
                active === position.join('_') ?
                    <Stack className='selectItems-wrap' sx={{ height: 'auto', minHeight: 34, position: 'absolute', borderRadius: '1px', flexWrap: "wrap", bgcolor: '#fff', ml: '-1px', boxShadow: '0 0 0 2px #2d7ff9 !important', width: width + 2 }} >
                        <Stack direction='row' sx={{ flexWrap: "wrap", alignItems: 'center' }} >
                            {
                                (() => {
                                    if (data.data.length) {
                                        return (
                                            <>
                                                {
                                                    data.data.map((item, i) => {
                                                        const idx = list.findIndex((e) => e.id === item);
                                                        return (
                                                            <Typography key={i} component='span' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '3px', ml: '3px', height: 18, borderRadius: 50, bgcolor: header[position[1]].colored ? list[idx]?.color : '#b3b0b0', px: 1, minWidth: 18, mr: .5 }}>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        maxWidth: "100%",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "pre",
                                                                        fontSize: 13,
                                                                        minWidth: 18,
                                                                        color: '#fff'
                                                                    }}
                                                                >
                                                                    {list[idx]?.label}
                                                                </Box>
                                                            </Typography>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    } else {
                                        return null;
                                    }
                                })()
                            }
                            {
                                header[position[1]].editable &&
                                <Stack onClick={handleClick} alignItems='center' justifyContent='center' sx={{ mt: .25, height: 28, borderRadius: '3px', px: .5, cursor: 'pointer', bgcolor: '#0000000d', '&:hover': { bgcolor: '#0000001a' } }}>
                                    <AddIcon sx={{ fontSize: 12 }} />
                                </Stack>
                            }
                        </Stack>
                    </Stack> :
                    <Box sx={{ p: '6px', height: '100%', display: 'flex' }}>
                        {
                            (() => {
                                if (data.data.length) {
                                    return (
                                        <>
                                            {
                                                data.data.map((item, i) => {
                                                    const idx = list.findIndex((e) => e.id === item);
                                                    return (
                                                        <Typography key={i} component='span' sx={{ height: 18, borderRadius: 50, bgcolor: header[position[1]].colored ? list[idx]?.color : '#b3b0b0', px: 1, mr: .5 }}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    maxWidth: "100%",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "pre",
                                                                    fontSize: 13,
                                                                    color: '#fff'
                                                                }}
                                                            >
                                                                {list[idx]?.label}
                                                            </Box>
                                                        </Typography>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                } else {
                                    return null;
                                }
                            })()
                        }
                    </Box>
            }
            <Popover
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ '& .MuiPaper-rounded': { width, mt: -1.5, minWidth: 160 } }}
            >
                <Box>
                    <TextField placeholder='Find an option' onChange={(e) => setSelectKey(e.target.value)} autoFocus sx={{ pt: 1, width: '100%', '& fieldset': { display: 'none' }, '& input': { py: 0, px: 1, fontSize: 13 } }} />
                    {
                        (() => {
                            const filtered = list.filter((one) => {
                                let exist = data.data.findIndex((a) => a === one.id);
                                return (exist === -1 && one.label.toLowerCase().search(selectKey) !== -1);
                            });
                            if (filtered.length) {
                                return (
                                    <>
                                        {
                                            filtered.map(({ label, color, id }, idx) => (
                                                <MenuItem onClick={() => close(id, label, color)} key={idx}>
                                                    <Typography component='span' sx={{ height: 18, borderRadius: 50, bgcolor: header[position[1]].colored ? color : '#b3b0b0', px: 1, minWidth: 18 }}>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                maxWidth: "100%",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "pre",
                                                                fontSize: 13,
                                                                minWidth: 18,
                                                                color: '#fff'
                                                            }}
                                                        >
                                                            {label}
                                                        </Box>
                                                    </Typography>
                                                </MenuItem>
                                            ))
                                        }
                                    </>
                                )
                            } else {
                                return <Box sx={{ p: 1 }} />
                            }
                        })()
                    }
                </Box>
            </Popover>
        </>
    )
}

export default MultiSelectCell;