
//Import utils folder.
import fetchSellingPlanGroup from './utils/fetchSellingPlanGroup';
import prepareTrialRecord from "./utils/prepareTrialRecord";
import updateSellingPlanGroupInput from "./utils/updateSellingPlanGroupInput";
import evaluateProductVariantChangesForSPG from "./utils/evaluateProductVariantChangesForSPG";

//Import common folder.

//Import create action folders.
import addProductVariantsToSPG from "./actions/create/addProductVariantsToSPG";
import createSellingPlanGroup from './actions/create/createSellingPlanGroup';
import createTrialOptions from "./actions/create/createTrialOptions";
import createTrialProducts from "./actions/create/createTrialProducts";
import createTrialProductVariants from "./actions/create/createTrialProductVariants";

//Import update action folders.
import updateSellingPlanGroup from "./actions/update/updateSellingPlanGroup";
import updateTrialOptions from "./actions/update/updateTrialOptions";

//Import delete action folders.
import deleteTrialOptions from "./actions/delete/deleteTrialOptions";
import deleteSellingPlanGroup from "../manageSPG/actions/delete/deleteSellingPlanGroup";
import removeTrialProducts from "./actions/delete/removeTrialProducts";
import removeTrialProductVariants from "./actions/delete/removeTrialProductVariants";
import removeProductVariantsFromSPG from "../manageSPG/actions/delete/removeProductVariantsFromSPG";
import removeProductsFromSPG from "../manageSPG/actions/delete/removeProductsFromSPG";

export {
    fetchSellingPlanGroup,
    prepareTrialRecord,
    updateSellingPlanGroupInput,
    evaluateProductVariantChangesForSPG,

    addProductVariantsToSPG,
    createSellingPlanGroup,
    createTrialOptions,
    createTrialProducts,
    createTrialProductVariants,

    updateSellingPlanGroup,
    updateTrialOptions,

    deleteTrialOptions,
    deleteSellingPlanGroup,
    removeTrialProducts,
    removeTrialProductVariants,
    removeProductVariantsFromSPG,
    removeProductsFromSPG,
}