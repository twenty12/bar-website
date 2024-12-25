import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Grid, Divider } from "antd";
import { PushpinFilled } from "@ant-design/icons";
const { useBreakpoint } = Grid;

// Function to create image paths
const createImagePaths = (imageCount: number) => {
  const imagePaths: string[] = [];
  for (let i = 1; i <= imageCount; i++) {
    imagePaths.push(
      `https://public-images-3f32a8e.s3.amazonaws.com/events/${i}.jpg`
    );
  }
  return imagePaths;
};

// SVG arrow string
const arrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <polyline points="12 5 19 12 12 19"></polyline>
</svg>`;

// Encode the SVG as a data URL
const arrowSVGDataUrl = `data:image/svg+xml;base64,${btoa(arrowSVG)}`;

const EventDetail: React.FC = () => {
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloaded, setPreloaded] = useState(false);

  const finalImage =
    "https://public-images-3f32a8e.s3.amazonaws.com/events/final.jpg";
  const imagePaths: string[] = [
    arrowSVGDataUrl,
    ...createImagePaths(31),
    finalImage,
  ];
  useEffect(() => {
    let loadedImages = 0;
    if (preloaded) return;
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === imagePaths.length) {
          setPreloaded(true);
        }
      };
    });
  }, [imagePaths, preloaded]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let delayAmount = 5; // Delay between each image change
    let initialDelay = 20 + imagePaths.length * delayAmount; // Starting delay of 150ms

    const startInterval = (delay: number) => {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex + 1 < imagePaths.length) {
            return prevIndex + 1;
          } else {
            clearInterval(interval); // Clear interval when reaching the last image
            return prevIndex;
          }
        });

        // Clear the old interval and start a new one with a 10ms faster delay
        clearInterval(interval);
        if (delay > delayAmount) {
          // Ensure the delay doesn't go below 10ms
          startInterval(delay - delayAmount);
        }
      }, delay);
    };

    if (preloaded) {
      startInterval(initialDelay); // Start the interval loop with initial delay
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [preloaded, imagePaths.length]);
  const getImgClass = (index: number) => {
    if (index === 0) return "spin";
    return currentImageIndex === imagePaths.length - 1 &&
      index === imagePaths.length - 1
      ? "fade-in"
      : "";
  };
  const color = { color: "rgba(0, 0, 0, 0.5)" };
  const imageColumn = (
    <Col
      xs={24}
      md={12}
      style={{ display: "flex", justifyContent: isBelowMd ? "center" : "left" }}
    >
      <>
        {imagePaths.map((src, index) => (
          <div
            key={index}
            style={{
              width: isBelowMd ? "300px" : "350px", // Set container width based on screen size
              aspectRatio: "1/1", // Maintain a 16:9 aspect ratio, change as needed
              display: currentImageIndex === index ? "block" : "none", // Show only the current image
              position: "relative", // For positioning the image
              marginLeft: isBelowMd ? 0 : "15px",
            }}
          >
            <img
              src={src}
              className={getImgClass(index)}
              alt={`Event Image ${index + 1}`}
              style={{
                width: "100%", // Fill the container width without exceeding it
                objectFit: "contain", // Maintain aspect ratio and prevent stretching
                border: currentImageIndex !== 0 ? "1px solid grey" : "", // Optional border
                borderRadius: "1px",
                position: "absolute", // Ensure it stays within the container
                top: 0,
                left: 0,
              }}
            />
          </div>
        ))}
      </>
    </Col>
  );
  const titleText = (
    <Typography.Title
      level={1}
      style={{
        marginTop: isBelowMd ? "30px" : "0",
        textAlign: isBelowMd ? "center" : "left",
        fontWeight: 700,
        fontSize: "50px",
      }}
    >
      Daniel's <br />
      Birthday Dinner
    </Typography.Title>
  );
  return (
    <>
      <style>
        {`
    header {
      display: none;
    }

    footer {
      display: none;
    }

    .fade-in {
      animation: fadeIn 0.5s ease-in forwards; /* Adjust the duration and easing as needed */
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: scale(0.95); /* Slightly scale the image down initially */
      }
      100% {
        opacity: 1;
        transform: scale(1); /* Scale back to normal size */
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .spin {
      display: inline-block;
      width: 100px; /* Set the size of the spinning element */
      height: 100px;
      animation: spin 1s linear infinite; /* Apply the spin animation */
    }

    @keyframes gradientShift {
      0% {
        background-position: 50% 0%;
      }
      100% {
        background-position: 50% 100%;
      }
    }

    .shifting-gradient {
      background: 
        url("https://assets.getpartiful.com/backgrounds/sunrise/web.jpg") no-repeat center center / cover,
        linear-gradient(1deg, 
          rgb(240, 212, 209) 0%, 
          rgb(240, 226, 200) 28%, 
          rgb(233, 236, 192) 44%, 
          rgb(231, 231, 205) 70%, 
          rgb(182, 207, 246) 100%);
      background-size: 400% 400%;
      animation: gradientShift 30s ease infinite;
    }
  `}
      </style>
      {isBelowMd ? titleText : null}
      {isBelowMd ? imageColumn : null}

      <Row gutter={[16, 16]} style={{ maxWidth: 1080, margin: "60px auto" }}>
        <Col xs={24} md={12}>
          {isBelowMd ? null : titleText}
          <Typography.Title level={4} style={{ marginTop: 0, fontWeight: 700 }}>
            Thursday, Oct 10
            <br />
            <span style={{ fontWeight: 300, ...color }}>8:00 PM</span>
          </Typography.Title>
          <Typography.Paragraph style={{ marginTop: 0 }}>
            <a
              href="https://maps.app.goo.gl/jAz7hzYL8aJANfEF9"
              target="_blank"
              rel="noreferrer"
            >
              <PushpinFilled /> 102 Franklin St, 3nd Floor <br />
              Tribeca
              <br />
              New York, NY 10013
            </a>
          </Typography.Paragraph>
          <Typography.Paragraph>
            $150 sliding scale
            <br />
            <a href="https://venmo.com/u/Daniel-Gladstone" target="blank_">
              Venmo
            </a>
          </Typography.Paragraph>
          <Divider style={{ width: "90%", minWidth: "0", display: "block" }} />
          <Typography.Paragraph>
            Come help me kick off the start of a new lap around the cosmos. This
            dinner will be a gathering of all the beautiful people in my life.
            It’s a chance for some really good people to collectively relax, let
            loose, and help set an intention of gratitude and generosity.
          </Typography.Paragraph>
          <br />
          <br />

          <Typography.Paragraph
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px solid white",
              borderRadius: "2px",
              padding: "10px",
            }}
          >
            <Typography.Title
              level={4}
              style={{ marginTop: 0, fontWeight: 700, marginBottom: 0 }}
            >
              Menu
            </Typography.Title>
            Food by Chef{" "}
            <a
              href="https://www.dayintonight.com"
              target="blank_"
              style={{ fontWeight: 700, textDecoration: "italic" }}
            >
              Ana Ortiz
            </a>
            <br />
            Cocktails by{" "}
            <a
              href="https://www.instagram.com/arleymarks/"
              style={{ fontWeight: 700, textDecoration: "italic" }}
              target="blank_"
            >
              Arley Marks
            </a>
            <br />
            <br />
            <strong>First Course</strong>
            <br />
            Bowls of hummus, chunks of outrageously delicious Bulgarian feta,
            olives, pickled vegetables, olive oil, dried fruits, and bread laid
            out on the table before everyone arrives – beautiful and bountiful.
            <br />
            <br />
            <strong>Second Course</strong>
            <br />
            Braised chicken thighs with roasted onions
            <br />
            Caramelized purple cabbage with labneh, tahini, and chili oil
            <br />
            Fregola with roasted squash, brown butter, and hazelnuts
            <br />
            A bright green salad with mustard greens and shallot dressing
            <br />
            <br />
            <strong>Dessert</strong>
            <br />
            Cardamom almond chocolate cake with wine-poached pears
            <br />
            <br />
            <strong>Drinks</strong>
            <br />
            Espresso Tequila Tonic
            <br />
            Sassafras Negroni
            <br />
            Beer, wine etc.
            <br />
            <small>🍄</small>
            <br />
            <small>
              <a
                href="https://public-images-3f32a8e.s3.amazonaws.com/events/brainstorm+.pdf"
                target="_blank"
              >
                *Based on input from this doc
              </a>
            </small>
          </Typography.Paragraph>
          <br />
          <Typography.Paragraph
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background
              color: "white", // Light text for contrast
              border: "1px solid white",
              borderRadius: "4px", // Slightly more rounded corners
              padding: "10px",
              display: "inline-block", // Fit to text width
              width: "auto", // Allow width to adjust based on content
              maxWidth: "100%", // Ensures it doesn't overflow the parent container
              wordWrap: "break-word", // Handles long words or links
            }}
          >
            <strong>Playlists</strong>
            <br />
            
          </Typography.Paragraph>
          <br />
          <Typography.Paragraph
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background
              color: "white", // Light text for contrast
              border: "1px solid white",
              borderRadius: "4px", // Slightly more rounded corners
              padding: "10px",
              display: "inline-block", // Fit to text width
              width: "auto", // Allow width to adjust based on content
              maxWidth: "100%", // Ensures it doesn't overflow the parent container
              wordWrap: "break-word", // Handles long words or links
            }}
          >
            <strong>After Dinner</strong>
            <br />
            Midnight to late at{" "}
            <a
              href="https://maps.app.goo.gl/ZZrby8oJ3WR2YqEo7"
              style={{ color: "#00d1b2" }} // Light teal for the link
            >
              The Dancer
            </a>
          </Typography.Paragraph>
        </Col>
        {isBelowMd ? null : imageColumn}
      </Row>
    </>
  );
};

export default EventDetail;
