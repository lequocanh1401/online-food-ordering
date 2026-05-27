import React from 'react';
import { IngredientsTable } from './IngredientsTable';
import { IngredientCategoryTable } from './IngredientCategoryTable';
import { Grid } from '@mui/material';

export const Ingredients = () => {
    return (
        <div className='px-2'>
            <Grid container spacing={2}>
                {/* Đổi item thành item="true" để React không báo lỗi DOM */}
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