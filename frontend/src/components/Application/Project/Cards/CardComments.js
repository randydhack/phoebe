function CardComments({comments}) {
  return (
    <div className="bg-[#F9F8F8] w-full">
      <div className="px-[22px]">
        <div className=" text-[#6e6d6f] font-medium pt-[20px] text-[14px]">
          Comments
        </div>
        <div className="py-[20px]">{
            comments.map((comment,i) => {
                return (
                    <div>{comment.comment}</div>
                )
            })
        }</div>
      </div>
    </div>
  );
}

export default CardComments;
