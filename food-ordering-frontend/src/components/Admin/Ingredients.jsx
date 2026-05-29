import React, { useEffect } from 'react';
import { IngredientsTable } from './IngredientsTable';
import { IngredientCategoryTable } from './IngredientCategoryTable';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// Đổi getIngredientCategoryOfRestaurant thành getIngredientCategory
import { getIngredientCategory, getIngredientsOfRestaurant } from '../../State/Ingredients/Action';

export const AdminIngredients = () => { // Đổi tên component tránh trùng với file
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt }));
            // Gọi đúng hàm getIngredientCategory
            dispatch(getIngredientCategory({ id: restaurant.usersRestaurant.id, jwt }));
        }
    }, [restaurant.usersRestaurant?.id, dispatch, jwt]);

    return (
        <div className='px-2'>
            <Grid container spacing={2}>
                <Grid item="true" xs={12} lg={8}>
                    <IngredientsTable />
                </Grid>
                <Grid item="true" xs={12} lg={4}>
                    <IngredientCategoryTable />
                </Grid>
            </Grid>
        </div>
    );
};