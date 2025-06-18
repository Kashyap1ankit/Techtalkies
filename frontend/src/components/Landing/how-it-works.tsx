import Balancer from "react-wrap-balancer";

export default function HowItWorks() {
  return (
    <div className="flex flex-col gap-24 md:gap-36  bg-[#eaf0f6] dark:bg-gray p-6 md:p-12 lg:p-24 mt-12">
      <div className="flex flex-col-reverse gap-8 lg:flex-row justify-between text-black">
        <div className="lg:w-1/2 flex flex-col items-center gap-4">
          <Balancer className="text-3xl md:text-4xl font-noto">
            AI-Generated Content You Can Customize to Perfection.
          </Balancer>

          <Balancer>
            Don&apos;t settle for one-size-fits-all content. With our AI-powered
            blog writer, generate drafts tailored to your needs and easily
            refine them to match your unique style and brand voice. The perfect
            blog is just a few edits away.
          </Balancer>
        </div>

        <div className=" lg:w-1/2 ">
          <img
            src="/sample2.png"
            className="w-full rounded-md shadow-xl border border-netural-200"
            aria-label="sample-image"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-8 lg:flex-row justify-between">
        <div className=" lg:w-1/2 ">
          <img
            src="/sample1.png"
            className="w-full rounded-md shadow-xl border border-netural-200"
            aria-label="sample-image"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col items-center gap-4">
          <Balancer className="text-3xl text-black md:text-4xl font-noto">
            Beat writer’s block with AI-written blog outlines and drafts.
          </Balancer>

          <Balancer className="text-black">
            Creative roadblocks can put a major strain on your content marketing
            efforts. Next time you feel like you&apos;re running out of ideas,
            use the AI blog writer to create an outline and rough draft for your
            next post, complete with your brand voice already incorporated, so
            that you&apos;re ready to publish in no time.
          </Balancer>
        </div>
      </div>
    </div>
  );
}
