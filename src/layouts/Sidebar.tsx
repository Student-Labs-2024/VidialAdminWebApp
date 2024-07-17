import { Box, Drawer } from "@mui/material";
import useTheme from "@mui/material";

export default function Sidebar() {


    return (
        <Box>
            <Drawer
                variant="persistent"
                anchor="left"
                open={true}
            >
            </Drawer>
        </Box>
    );
}