export default function TrustedBy() {
  const arr = [
    "https://bookface-images.s3.amazonaws.com/small_logos/d13287c52acc96909f32342e85c26a33cfdac310.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/3e9a0092bee2ccf926e650e59c06503ec6b9ee65.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/d583cc2bc592cccd5ff68e81f8fce6bc48be8025.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/9750fca21baaee75e035f1baaf58df8e2f5dcc67.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/f09464ae6ddf165ef871115af711c89d6530057f.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/af0d32f65e9007b7edbde422787633e338fa9bff.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/7f54038f84e639bce5c45d1756018b94f17f6125.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/d0e24465d91469fa05da337659e25131f5295e3d.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/33ee27aa9c6b3036b40ec6c7f0c2a98ccaf32f40.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/b9aae9ad065dcf8b7a07d47b45a0667c6953810b.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/bdee5b69dd38909ad07702b3aebc29f8d5880658.png",
    "https://bookface-images.s3.amazonaws.com/small_logos/72237ca3782563f0b12ffe1fe9869d878c153ab6.png",
  ];

  return (
    <div className="mt-28 md:mt-44">
      <p className="font-bricolage font-semibold text-gray-500">
        Trusted by top engineering teams worldwide
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center mt-16 sm:mt-24 w-3/4 sm:w-1/2 mx-auto">
        {arr.map((e) => {
          return <img src={e} className="size-12 md:size-16 saturate-75" />;
        })}
      </div>
    </div>
  );
}
