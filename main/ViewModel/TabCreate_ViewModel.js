import { PostReferralBuilderService } from "../service/AppService";

// formUtils.js
export const handleSubmit = async (formData) => {
    try {
      const response = await PostReferralBuilderService(formData);
      const clearedFormData = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        addressLine1: '',
        addressLine2: '',
        suburb: '',
        state: '',
        postalCode: '',
        country: '',
      };


  
      return clearedFormData;
    } catch (error) {
      console.error('Error submitting data:', error.message);
      throw error;
    }
  };
  