import "./HomeSlider.css"
import sliderImg from "../../assets/img/slider.png"
const HomeSlider = () => {
    return (
        <>
            <section className="home-slider">
                <img src={sliderImg} alt="sliderImg1" />
            </section>
        </>  
    );
}
 
export default HomeSlider;