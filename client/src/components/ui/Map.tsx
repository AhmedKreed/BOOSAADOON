import React from "react";

const Map: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full md:w-2/3 lg:w-1/2 p-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30619479.43249248!2d123.8248915!3d40.3398528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356334d3c3a4fb13%3A0xfdf13597b9ce3b98!2sNorth%20Korea!5e0!3m2!1sen!2s!4v1643930416261!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
