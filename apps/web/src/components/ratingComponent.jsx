import React from "react";
import { Typography, Avatar, Rating } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  ratingValue: Yup.number().required("Rating is required"),
  comment: Yup.string().required("Comment is required"),
});

export function RatingWithComment() {
  const formik = useFormik({
    initialValues: {
      ratingValue: 0,
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission logic here
      console.log("Form submitted:", values);

      // Reset the form after submission
      resetForm();

      // Manually reset the rating to 0
      // formik.setFieldValue("ratingValue", 0);
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-lg">
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image"
          size="lg"
        />
        <Typography variant="h6" className="mt-4">
          Tania Andrew
        </Typography>
        <Typography color="gray" className="mb-4 font-normal">
          Lead Frontend Developer
        </Typography>
      </div>
      <form onSubmit={formik.handleSubmit} className="text-center">
        <Rating
          value={formik.values.ratingValue}
          onChange={(value) => formik.setFieldValue("ratingValue", value)}
        />
        {formik.touched.ratingValue && formik.errors.ratingValue ? (
          <div className="text-red-500">{formik.errors.ratingValue}</div>
        ) : null}
        <textarea
          className="w-full h-20 p-2 mt-4 border rounded-md"
          placeholder="Add your comment..."
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div className="text-red-500">{formik.errors.comment}</div>
        ) : null}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
