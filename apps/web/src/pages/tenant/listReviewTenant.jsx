// TenantReviews.js
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Select,
  Card,
  CardBody,
  CardFooter,
  Rating,
  Option,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';

export const TenantReviews = () => {
  const token = localStorage.getItem('token');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  const replySchema = Yup.object({
    replyContent: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      replyContent: '',
    },
    validationSchema: replySchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(
        'Replying to review:',
        currentReview?.id,
        'with content:',
        values.replyContent,
      );
      handleReplyRating(values, currentReview?.id);
      setTimeout(() => {
        setSubmitting(false);
        handleCloseDialog();
        resetForm();
      }, 400);
    },
  });

  const handleReplyRating = async (values, reviewId) => {
    try {
      const payload = {
        ...values, 
        reviewId: reviewId, 
      };
      const response = await axios.patch(
        'http://localhost:8000/api/transaction/ratings', 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      
      const updatedReview = response.data;

      
      setProperties((prevProperties) => {
        return prevProperties.map((property) => {
          if (property.id === selectedProperty.id) {
            return {
              ...property,
              Reviews: property.Reviews.map((review) => {
                if (review.id === reviewId) {
                  return updatedReview;
                }
                return review;
              }),
            };
          }
          return property;
        });
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const getDataProperty = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/property/ratings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProperties(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedProperty(value);
  };

  const handleReplyClick = (review) => {
    setCurrentReview(review);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  useEffect(() => {
    getDataProperty();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="w-72">
        <Select label="Your Property" onChange={handleSelectChange}>
          {properties.map((property) => (
            <Option key={property.id} value={property}>
              {property.name}
            </Option>
          ))}
        </Select>
      </div>
      <h2 className="text-2xl font-bold mb-4">Review from user</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedProperty.Reviews?.map((review) => (
          <Card key={review.id}>
            <CardBody>
              <div className="flex gap-2">
                <Rating value={review.rating} readonly />
                <p>{review.rating}</p>
              </div>

              <p className="text-gray-700 mt-2">{review.user_review}</p>
              <p className="text-gray-500 mt-1">{review.User.name}</p>
            </CardBody>
            <CardFooter>
              {review.tenant_reply ? (
                <p>{review.tenant_reply}</p>
              ) : (
                <Button color="blue" onClick={() => handleReplyClick(review)}>
                  Reply
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog size="lg" open={openDialog} handler={handleCloseDialog}>
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>Reply to Review</DialogHeader>
          <DialogBody>
            <Input
              type="text"
              name="replyContent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.replyContent}
              color="lightBlue"
              size="regular"
              placeholder="Your reply"
            />
            {formik.touched.replyContent && formik.errors.replyContent ? (
              <div className="text-red-500 text-sm">
                {formik.errors.replyContent}
              </div>
            ) : null}
          </DialogBody>
          <DialogFooter>
            <Button color="red" onClick={handleCloseDialog} variant="outlined">
              Cancel
            </Button>
            <Button color="green" type="submit" disabled={formik.isSubmitting}>
              Send Reply
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};
