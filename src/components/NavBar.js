import "../styles/NavBar.css";

function NavBar() {
	const open = function () {
		document.querySelector(".menu-btn").classList.toggle("open");
      document.querySelector('.mobile-links').classList.toggle('hidden')
	};

	return (
		<header>
			<nav className="container desktop-links">
				<div className="nav-links">
					<img src="/images/logo.svg" alt="logo img"></img>
					<a href="#">Features</a>
					<a href="#">Pricing</a>
					<a href="#">Resources</a>
				</div>
				<div className="nav-links items-center">
					<a href="#">Login</a>
					<a href="#" className="btn-primary btn">
						Sign Up
					</a>
				</div>
				<div className="flex justify-between w-full md:hidden relative">
					<img src="/images/logo.svg" alt="logo img"></img>
					<div className="menu-btn" onClick={open}>
						<div className="menu-1"></div>
						<div className="menu-2"></div>
						<div className="menu-3"></div>
					</div>
					<nav className="hidden flex-col absolute left-0 right-0 text-center
                divide-y-[1px] bg-[#3A3053] gap-y-4 mobile-links rounded-md px-4 top-[4rem]
                py-[2.5rem] z-10">
						<div className="flex flex-col gap-y-[2rem] w-full">
							<a href="#">Features</a>
							<a href="#">Pricing</a>
							<a href="#" className="mb-4">Resources</a>
						</div>
						<div className="flex flex-col text-center w-full gap-y-[1rem]">
							<a href="#" className="mt-5">Login</a>
							<a href="#" className="btn-primary py-[13px] mx-2">
								Sign Up
							</a>
						</div>
					</nav>
				</div>
			</nav>
		</header>
	);
}
export default NavBar;
