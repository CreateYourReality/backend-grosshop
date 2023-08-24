import "./HomeSlider.css"
import sliderImg from "../../assets/img/slider.png"
import HomeSliderContainer from "./HomeSliderContainer/HomeSliderContainer";
import { useState } from "react";
import { useEffect } from "react";
const HomeSlider = ({setDealFilter}) => {
    const slides = [{tag: "deal", text: "Hier steht was."}, {tag: "memberDeal", text: "woop woop."}]
    const [tagText, setTagText] = useState("")

    useEffect(()=> {
        setDealFilter(tagText)
    },[tagText])
    return (
        <>
            <section className="home-slider">
                {slides.map((sliderItem, i) => <HomeSliderContainer setDealFilter={setDealFilter} sliderItem={sliderItem.tag} text={sliderItem.text} tagText={tagText} setTagText={setTagText} index={i} key={i}/>)}
{/*                 <img src={sliderImg} alt="sliderImg1" /> */}
            </section>
        </>  
    );
}
 
export default HomeSlider;