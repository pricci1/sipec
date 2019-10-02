import { useContext } from "React";
import APIContext from "../components/APIProvider";

const api = useContext(APIContext);

export const getAllDiios = async apiInstance => {
  await apiInstance.get(...);
  
};

export const getDiiosRange = (apiInstance, from, to) => {
  apiInstance
    .get(...)
    .then(...);

};

export const postDiio = async (apiInstance, diio) => {
  await apiInstance.post(...);
  ...
};

export const anotherThingYouCanDoWithDiios = async (apiInstance, stuff, andMore) => {
  await apiInstance.get(...);
  await apiInstance.post(...);
  
};
