import React from 'react';

const Map = () => {
	return(
		<div style={{ width: "100%", height: "300px", textAlign: "center", marginTop: "20px", position:"relative"}}>
			<iframe
				style={{ 
					width: "90%", 
					height: "300px", 
					borderRadius: "10px",
					zIndex: "1"
				}}
				scrolling="no"
				src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Nairobi+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed&disableDefaultUI=true"
			>
			</iframe>
			{/* <div
			style={{
			position: "absolute",
			textAlign: "center",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			background: "linear-gradient(to bottom, rgba(20, 3, 65, 0.5), rgba(76, 38, 245, 0))",
			zIndex: "2",
			pointerEvents: "none",
			}}
		></div> */}
	</div>
	);
}

export default Map;