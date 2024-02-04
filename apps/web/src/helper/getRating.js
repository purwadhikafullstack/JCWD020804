function averageRating(review = []) {
    console.log(review);
    const totalRating  = review?.reduce((acc, review) => acc + review.rating, 0);
  const resRating = totalRating / review?.length;
  return resRating
}

export {averageRating}