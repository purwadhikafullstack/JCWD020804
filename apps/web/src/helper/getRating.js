function averageRating(review = []) {
    if (!review || review.length === 0) {
      return null; 
    }
    const totalRating  = review?.reduce((acc, review) => acc + review.rating, 0);
  const resRating = totalRating / review?.length;
  return parseFloat(resRating.toFixed(1));
}

export {averageRating}