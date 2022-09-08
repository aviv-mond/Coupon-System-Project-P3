import { Typography } from "@mui/material";
import { Company } from "../../../Models/Company";
import "./singleCompany.css";

interface SingleCompanyProps {
	company: Company
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
    return (
        <div className="singleCompany Box">
			<Typography variant="h2">{props.company.id}</Typography><hr/><br/>
            {props.company.name}<br/><br/>
            {props.company.email}<br/><br/>
        </div>
    );
}

export default SingleCompany;
