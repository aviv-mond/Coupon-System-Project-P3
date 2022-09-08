import { Typography } from "@mui/material";
import "./pageFooter.css";

function PageFooter(): JSX.Element {
    return (
        <div className="pageFooter" dir="ltr">
			<Typography variant="subtitle1">&#169; All rights reserved</Typography>
        </div>
    );
}

export default PageFooter;
