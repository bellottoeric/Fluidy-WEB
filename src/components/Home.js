import React, { useState, useEffect, useRef } from 'react';
import { useApi } from 'react-use-fetch-api';
import globalConfig from "../config.js"
import { animateScroll as scroll } from 'react-scroll'
import { Link } from "react-router-dom";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());
const FadeUpToRight = batch(Fade(), Move(), Sticky(), MoveOut());

function Home() {
    const myRef = useRef(null);
    const { get } = useApi()
    const [categoriesList, setCategoriesList] = useState([])
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        get(globalConfig.host + '/v1/categories').then(data => {
            console.log(data)
            setLoading(false)
            setData(data)
            setSelected(data[0])
        })
    }, [])

    function countryChoice(country) {
        if (!loading) {
            for (var i of data) {
                if (country === i.lang) {
                    setSelected(i)
                    scroll.scrollToBottom({
                        duration: 3000,
                        delay: 0,
                        smooth: "true",
                        offset: 0
                    });
                }
            }
        }
    }

    function changeCountry() {
        document.getElementById('scrollToLang').scrollIntoView({ behavior: "smooth" });
        console.log("dsqfsf")
    }

    return (
        <div>
            <ScrollContainer>
                <ScrollPage page={0}>
                    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
                        <div className="levatation">
                            <span className="ContainerHeaderTitle">
                                FLUIDY
                            </span>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={1}>
                    <Animator animation={FadeUp}>
                        <div className="levatation">
                            <span>
                                <Animator animation={batch(MoveIn(0, 500), Fade())}>
                                    Don't miss any news with Fluidy
                                </Animator>
                            </span>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={2}>
                    <Animator animation={FadeUp}>
                        <div className="levatation">
                            <span>
                                <Animator animation={batch(MoveIn(0, 0), Fade())}>
                                    Functionnalities
                                </Animator>
                                <Animator animation={batch(MoveIn(-850, 0), MoveOut(850, 0))}>Rss</Animator>
                                <Animator animation={batch(MoveIn(-750, 0), MoveOut(750, 0))}>Twitter - Reddit</Animator>
                                <Animator animation={batch(MoveIn(-650, 0), MoveOut(650, 0))}>+20 Categories for 6 langues</Animator>
                                <Animator animation={batch(MoveIn(-550, 0), MoveOut(550, 0))}>Open source project</Animator>
                                <Animator animation={batch(MoveIn(-450, 0), MoveOut(450, 0))}>Public API</Animator>
                            </span>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={3}>
                    <Animator animation={FadeUp}>
                        <div className="levatation">
                            <span>
                                <Animator animation={batch(MoveIn(0, 500), Fade())}>
                                    Let's Started!
                                </Animator>
                            </span>
                        </div>
                    </Animator>
                </ScrollPage>
                <div id="scrollToLang" style={{ display: "block" }}></div>
                <ScrollPage page={4}>
                    <Animator animation={batch(Fade(), Sticky())}>
                        <div id="countryChoiceSelector" className="levatation" name="containerCountryChoice">
                            <span >
                                <Animator animation={MoveIn(0, -1000)}>
                                    <p style={{ textAlign: "center" }}>
                                        Choice your country
                                    </p>
                                </Animator>
                            </span>
                        </div>
                        <br /><br /><br />
                        <div className="levatationHeavy">
                            <Animator animation={MoveIn(0, 1000)}>
                                <div className="flag-hexagon-column">
                                    <div className="flag-hexagon-row">
                                        <div onClick={() => countryChoice('English')} className="flag-hexagon">
                                            <img className="flag-img flag-contain" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png" alt="Flag Usa Homepage" />
                                        </div>
                                        <div onClick={() => countryChoice('French')} className="flag-hexagon">
                                            <img className="flag-img flag-fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" alt="Flag French Homepage" />
                                        </div>
                                        <div onClick={() => countryChoice('German')} className="flag-hexagon">
                                            <img className="flag-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png" alt="Flag Germany Homepage" />
                                        </div>
                                    </div>
                                    <div className="flag-hexagon-row">
                                        <div onClick={() => countryChoice('Italian')} className="flag-hexagon">
                                            <img className="flag-img flag-fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/800px-Flag_of_Italy.svg.png" alt="Flag Italy Homepage" />
                                        </div>
                                        <div onClick={() => countryChoice('Portuguese')} className="flag-hexagon">
                                            <img className="flag-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_Portugal.svg/800px-Flag_of_Portugal.svg.png" alt="Flag Portugal Homepage" />
                                        </div>
                                        <div onClick={() => countryChoice('Spanish')} className="flag-hexagon">
                                            <img className="flag-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_Spain.svg/800px-Flag_of_Spain.svg.png" alt="Flag Spain Homepage" />
                                        </div>
                                    </div>
                                </div>
                            </Animator>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={5}>
                    <Animator animation={batch(Fade(), Sticky())}>
                        <div className="levatation">
                            <Animator animation={MoveIn(0, -1000)}>
                                <span onClick={() => changeCountry()}>{selected.lang}</span>
                            </Animator>
                        </div>
                        <div className="levatationHeavy">
                            {selected && data &&
                                <>
                                    {selected.categories.map((category, index) => <>
                                        <Animator animation={batch(MoveIn(-100 * index - 100, 0), Fade())}>
                                            <Link className="listCategory" to={`/articles/${selected.lang}/${category}`} tabIndex={index}>
                                                {category.replace(/-/g, " ")}
                                            </Link>
                                        </Animator>
                                    </>)}
                                </>
                            }
                        </div>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
            <br /><br /><br /><br /><br />
            <h6>You are on https://fluidy.news</h6>
        </div>
    )
}

export default Home