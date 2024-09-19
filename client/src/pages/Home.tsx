
import { Box } from "@mui/material";

const HomePage = () => {

    return (
        <Box display="flex" flexDirection="column">
            <Box alignSelf="center" sx={{fontSize: 32}} mb={4} textTransform={"uppercase"}>
                Football Ranker
            </Box>

            <Box>Here's how to get started:</Box>
            <Box ml={2}>1. Navigate to the 'Teams' page.</Box>
            <Box ml={2}>2. Input the teams based on the format requested.</Box>
            <Box ml={2}>3. The teams will be populated accordingly and listed in a table.</Box>
            <Box ml={2}>4. Navigate to the 'Matches' page.</Box>
            <Box ml={2}>5. Input the matches based on the format requested.</Box>
            <Box ml={2}>6. The matches will be populated accordingly and listed in a table.</Box>
            <Box ml={2}>7. Navigate to the 'Rankings' page. This will show all the teams ranked within their group.</Box>
        </Box>
    );
};

export default HomePage;