import { useState } from "react";
import "../styles/ShortenLinks.css";
import Form from "./Form";
import axios from "axios";

function ShortenLinks() {
	const copyText = (id) => {
		const text = document.getElementById(`url-${id}`);
		const btn = document.getElementById(`btn-${id}`);
		btn.innerText = "Copied";
		btn.classList.add("copied");
		navigator.clipboard.writeText(text.textContent);
	};

	const callApi = function () {
		const url = 'https://google.com/';
		const apiUrl = 'https://cleanuri.com/api/v1/shorten';
		
		axios.post(apiUrl, { url: encodeURIComponent(url) })
		  .then(response => {
			 const shortenedUrl = response.data.result_url;
			 console.log('Shortened URL:', shortenedUrl);
		  })
		  .catch(error => {
			 console.error('Error:', error.message);
		  });
	};

	callApi();

	return (
		<section id="links" className="relative">
			<div className="absolute w-full -top-20">
				<Form />
			</div>
			<div className="container links-container">
				<div
					className="bg-white rounded-sm flex justify-between p-4
				 flex-col md:flex-row md:items-center divide-y-2 divide-[#E8E8E8] gap-y-4
				 md:divide-y-0"
				>
					<p>https://www.frontendMentor.io</p>
					<div
						className="flex gap-x-8 md:items-center flex-col md:flex-row
					 gap-y-4"
					>
						<p
							className="text-[#29cfcf] mt-4 md:mt-0 text-[0.95rem]"
							id="url-1"
						>
							https://www.frontendMentor.io
						</p>
						<button
							className="copy-btn"
							onClick={() => {
								copyText("1");
							}}
							id="btn-1"
						>
							Copy
						</button>
					</div>
				</div>
			</div>
			<div className="container">
				<h2 className="text-center md:mt-[10rem] mt-[6.5rem] text-[2rem] font-bold mb-4">
					Advanced Statistics
				</h2>
				<p
					className="max-w-lg text-center mx-auto text-[#9e9aa7] mb-4 leading-7
                 text-lg"
				>
					Track how your links are performing across the web with our advanced
					statistics dashboard.
				</p>
				<div
					className="flex mt-20 gap-x-12 justify-center mb-10 relative flex-col md:flex-row
				 items-center md:items-start gap-y-[5rem]"
				>
					<div className="line"></div>
					<div className="details">
						<div className="round">
							<img src="/images/icon-brand-recognition.svg"></img>
						</div>
						<p className="details-heading">Brand Recognition</p>
						<p className="details-text">
							Boost your brand recognition with each click. Generic links don’t
							mean a thing. Branded links help instil confidence in your
							content.
						</p>
					</div>
					<div className="details">
						<div className="round">
							<img src="/images/icon-detailed-records.svg"></img>
						</div>
						<p className="details-heading">Detailed Records</p>
						<p className="details-text">
							Gain insights into who is clicking your links. Knowing when and
							where people engage with your content helps inform better
							decisions.
						</p>
					</div>
					<div className="details">
						<div className="round">
							<img src="/images/icon-fully-customizable.svg"></img>
						</div>
						<p className="details-heading">Fully Customizable</p>
						<p className="details-text">
							Improve brand awareness and content discoverability through
							customizable links, supercharging audience engagement.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ShortenLinks;
