import { Typography } from "@mui/material";
import AllCoupons from "../../user/allCoupons/allCoupons";
import "./pageMain.css";

function PageMain(): JSX.Element {
    return (
        <div className="pageMain" dir="ltr">
            <Typography variant="h3" align="center">Welcome!</Typography>
			<AllCoupons/>
        </div>
    );
}

export default PageMain;
