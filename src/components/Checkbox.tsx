import React, { useEffect, useState, type FormEventHandler } from "react";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import { selectedDepartments, selectedRegions } from "../utils/atoms";
export default function App() {
    const [categories, setCategories] = useState([]);
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        fetch(`/api/categories.json`).then((response) => response.json()).then((data) => {
            setCategories(data.departments);
            setRegions(data.regions);
        });
    }, []);

    const onDepartmentChange = (value: string[]) => {
        selectedDepartments.set(value);
    }

    const onRegionChange = (value: string[]) => {
        selectedRegions.set(value);
    }

    return (
        <>
            <CheckboxGroup
                label="Výběr kraje"
                defaultValue={[]}
                onValueChange={onRegionChange}
            >
                {regions.map((region) => (
                    <Checkbox value={region} key={region}>{region}</Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup
                label="Výběr oboru"
                defaultValue={[]}
                onValueChange={onDepartmentChange}
            >
                {categories.map((category) => (
                    <Checkbox value={category} key={category}>{category}</Checkbox>
                ))}
            </CheckboxGroup>
        </>
    );
}
