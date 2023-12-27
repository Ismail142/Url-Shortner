import  "../styles/Hero.css";

function Hero() {
	return (
		<section id="hero" className="container">
			<div className='hero-container'>
				<div className='description'>
					<h1 className="max-md:mt-9">More than just <br></br>shorter links</h1>
					<p className="my-2 text-[#9d99a6]">
						Build your brand’s recognition and get detailed insights on how your
						links are performing.
					</p>
               <a href="#" className='btn-primary btn'>Get Started</a>
				</div>
            <img src="/images/illustration-working.svg" className="max-md:scale-[1.3] 
				 max-md:translate-x-[5rem]"></img>
			</div>

		</section>
	);
}

export default Hero;
