import React, {useContext} from "react";
import { MDBDataTable } from "mdbreact";
import ApiContext from "../APIProvider"
import {getChangeDiioDataApi} from "../../lib/ApiAnimalAdministration"
import { get } from "http";

export const DiioChangeTable = ({ data, setModalChangeId, toggleModal }) => {
	const api = useContext(ApiContext);
	var columns = [
		{
			label: "Ver",
			field: "show",
			sort: "asc",
			width: 40
		},
		{
			label: "Fecha de Registro",
			field: "date",
			sort: "asc",
			width: 100
		},
		{
			label: "RUP",
			field: "rup",
			sort: "asc",
			width: 150
		},
		{
			label: "Establecimiento",
			field: "establishment",
			sort: "asc",
			width: 270
		},
		{
			label: "RUT",
			field: "rut",
			sort: "asc",
			width: 150
		},
		{
			label: "MVA",
			field: "mva",
			sort: "asc",
			width: 200
		}
	];
	async function getChangeDiioData() {
		const data = await getChangeDiioDataApi(api, api.titular.id);
		
	}
	


	

};
