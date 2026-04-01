import React, { useState } from "react";
import methodStyles from "./Teachingmethod.module.css";
import contentShape from "../../assets/teachingMethodAssets/Shape.svg";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";

const TeachingMethodCard = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Truncate text for the card
  const shortText = content.length > 200 ? content.substring(0, 180) + "..." : content;

  return (
    <>
      <div className={methodStyles.card}>
        <div className={methodStyles.iconWrapper}>
          <img src={contentShape} alt="icon" />
        </div>
        <h5>
          <b>{title}</b>
        </h5>
        <p>{shortText}</p>
        <button 
          className={methodStyles.readMoreBtn} 
          onClick={() => setIsOpen(true)}
        >
          Read More
        </button>
      </div>

      {/* Modal moved outside card div to prevent layout shift */}
      {isOpen && (
        <div className={methodStyles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={methodStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={methodStyles.closeBtn} onClick={() => setIsOpen(false)}>&times;</button>
            <div className={methodStyles.modalHeader}>
              <img src={contentShape} alt="icon" style={{ width: "30px", marginRight: "15px" }} />
              <h3>{title}</h3>
            </div>
            <div className={methodStyles.modalBody}>
              <p>{content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Teachingmethod = () => {
  const methods = [
    {
      title: "Positive reinforcement",
      content: "Why did the Prophet inform the ten promised Paradise of their fate? This is positive reinforcement. ‘The pleasant outcome should increase the likelihood that you engage in the behavior in the future.’ [Schwartz, 134] The Prophet used this principle a lot. He once made the dua ‘O Allah! Increase his understanding in religion,’ for Abdullah ibn Abbas (radiyallahu anh) for nothing but preparing the Prophet’s pot for doing wudu. [Bukhari]."
    },
    {
      title: "Examples and parables",
      content: "The Messenger of Allah (ﷺ) said: “Do you think that if there was a river by the gate of one of you, and he bathed in it five times each day that there would remain any filth on him?” They said: “No filth would stay on him.” He said: “That is the parable of the five prayers, Allah wipes out the sins with them.” [Tirmidhi] By using parables and analogies, a complex problem can be transferred to form a picture that is much easier to visualize and understand by the process of mapping."
    },
    {
      title: "Graphic representations",
      content: "‘Pictures aptly capture concrete and spatial information in a manner analogous to whatever they represent,’ [Sternberg, 204] in a way impossible by just using words. Thus it is a powerful learning tool. The Prophet (ﷺ) drew up a square and in the middle of it he drew a line, the end of which jutted out beyond the square. Further across the middle line, he drew a number of smaller lines. Then he (ﷺ) said, “The figure represents man and the encircling square is the death which is encompassing him. The middle line represents his desires and the smaller lines are vicissitudes of life. If one of those misses him, another distresses him, and if that one misses him, he falls victim to another. [Bukhari]"
    },
    {
      title: "Repetition",
      content: "The Messenger of Allah (ﷺ) would repeat a statement three times so that it could be understood. [Tirmidhi] In fact, he would not just repeat statements three times and be done with it. He would repeat important advices over and over again in different ways. That is why there exist many hadiths on any one topic, for example, charity. He also encouraged the repeated recitation of the Quran mentioning its rewards. This is called overt rehearsal in psychology. One needs also to think about the words and their inter-relationships. [Sternberg, 176]"
    },
    {
      title: "Teaching by modelling",
      content: "When Aishah radiyallahu anh was asked about the character of the Prophet, she said, ‘The character of Messenger of Allah (ﷺ) was the Qur’an.’ [Abu Dawud] The Prophet would practice everything that he taught in order to provide for us a perfect model which to follow. Indeed in the Messenger of Allah (Muhammad SAW) you have a good example to follow for him who hopes in (the Meeting with) Allah and the Last Day and remembers Allah much. [33:21] This is called observational learning, and ‘it occurs when individuals acquire new forms of behavior or thought simply by observing the actions of others.’ [Baron, 123]"
    }
  ];

  return (
    <>
      <div className={`container mb-5 ${methodStyles.teachingMethod}`}>
        <div className={methodStyles.title}>
          <h1>
            <b>Teaching Methodology</b>
          </h1>
          <h3>
            Burhan Quran Academy focuses on more than just passing on
            information about the Quran. It aims to build a stronger connection 
            with the sacred text through effective teaching methods.
          </h3>
        </div>
        <div className={methodStyles.content}>
          <div className={methodStyles.topdivider}>
            <div className={methodStyles.cards}>
              {methods.map((method, index) => (
                <TeachingMethodCard 
                  key={index} 
                  title={method.title} 
                  content={method.content} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Footer2 />
    </>
  );
};

export default Teachingmethod;
