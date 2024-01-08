import { useState, useEffect } from "react";
import "../styles/ShortenLinks.css";
import Form from "./Form";

function ShortenLinks() {
	const [data, setData] = useState([]);

	useEffect(() => {
		for (const key in localStorage) {
			if (key.toString() === "length") break;
			setData((prevData) => {
				return [{"key":key, "data":localStorage[key]},...prevData]
			});
		}
		return () => {};
	}, []);

	const copyText = (id) => {
		const text = document.getElementById(`url-${id}`);
		const btn = document.getElementById(`btn-${id}`);
		btn.innerText = "Copied";
		btn.classList.add("copied");
		navigator.clipboard.writeText(text.textContent);
	};

	const deleteUrl = (lKey,id) => {
		localStorage.removeItem(lKey);
		setData((prevData) => prevData.filter((val, key) => key !== id));
	};

	const callApi = async function (url) {
		const key = process.env.REACT_APP_API_KEY;
		const response = await fetch("https://url-shortener-service.p.rapidapi.com/shorten", {
			method: "POST",
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': key,
				'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
			},
			body: new URLSearchParams({
				url: url
			})
		})
			.then((response) => response.json())
			.then((data) => {
				return data.result_url;
			})
			.catch((error) => {
				alert(error);
			});

		return response;
	};
	

	const addUrl = async function (link) {
		const show = document.querySelector('.error');
		show.textContent = "shortening";
		show.classList.add("text-slate-400")
		show.classList.remove("hidden");
		const shortenLink = await callApi(link);
		const id = localStorage.length+1;
		localStorage.setItem(id, [
			link,
			shortenLink ?? "error",
		]);
		show.classList.add("hidden");
		setData((prevData) => [{"key":id,"data":`${link},${shortenLink??'error'}`}, ...prevData]);
	};

	return (
		<section id="links" className="relative">
			<div className="absolute w-full -top-20">
				<Form addUrl={addUrl} />
			</div>
			<div className="container links-container">
				{data.map((value, key) => {
					const link = value.data;
					const originLink = link.split(",")[0];
					const shortenLink = link.split(",")[1];
					return (
						<div
							key={key}
							className="bg-white rounded-sm flex justify-between p-4
				           flex-col md:flex-row md:items-center divide-y-2 divide-[#E8E8E8] gap-y-4
				          md:divide-y-0 my-[1rem]"
						>
							<p>{originLink}</p>
							<div
								className="flex gap-x-8 md:items-center flex-col md:flex-row
					          gap-y-4"
							>
								<a
									className="text-[#29cfcf] mt-4 md:mt-0 text-[0.95rem]"
									id={`url-${key}`}
									href={shortenLink}
									target="_blank"
								>
									{shortenLink}
								</a>
								<button
									className="copy-btn"
									onClick={() => {
										copyText(key.toString());
									}}
									id={`btn-${key}`}
								>
									Copy
								</button>
								<button
									className="copy-btn"
									onClick={() => {
										deleteUrl(value.key,key);
									}}
									id={`btn-${key}`}
								>
									x
								</button>
							</div>
						</div>
					);
				})}
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
