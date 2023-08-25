import sliderImg0 from "../../../assets/img/slider.png"
import sliderImg1 from "../../../assets/img/slider.png"
import "./HomeSliderContainer.css"
const HomeSliderContainer = ({tagText, setTagText, index, sliderItem, text}) => {

    const sliderImg = index===0?sliderImg0:sliderImg1
    return ( 
    <>
        <div className={tagText === sliderItem?"sliderContainer active":"sliderContainer"} onClick={()=> tagText === sliderItem?setTagText(tagText):setTagText(sliderItem)}>
            <div className="img-wrapper">
                <img className="resize" src={sliderImg} alt={`${sliderItem}-img`}/>
                <p>{text}</p>
            </div>
        </div>
    </>
     );
}
 
export default HomeSliderContainer;