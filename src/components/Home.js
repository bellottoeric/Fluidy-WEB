import React, { useState, useEffect } from 'react';
import { useApi } from 'react-use-fetch-api';
import globalConfig from "../config.js"
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

function Home() {
    const { get } = useApi()
    const [categoriesList, setCategoriesList] = useState([])
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        get(globalConfig.host + '/v1/categories').then(data => {
            console.log(data)
            setLoading(false)
            setData(data)
        })
    }, [])

    function countryChoice(country) {
        if (!loading) {
            for (var i of data) {
                if (country === i) {

                }
            }
        }
    }

    return (
        <div>
            <ScrollContainer>
                <ScrollPage page={0}>
                    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
                        <span className="ContainerHeaderTitle">FLUIDY</span>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={1}>
                    <Animator animation={ZoomInScrollOut}>
                        <span>I'm FadeUpScrollOut </span>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={2}>
                    <Animator animation={FadeUp}>
                        <span>
                            <Animator animation={MoveOut(1000, 0)}>Functionnalities</Animator>
                        </span>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={3}>
                    <Animator animation={FadeUp}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
                            <span>
                                <Animator animation={MoveIn(-1000, 0)}>Hello Guys</Animator>
                                <Animator animation={MoveIn(-750, 0)}>Nice to meet you</Animator>
                                <Animator animation={MoveIn(-500, 0)}>Good bye</Animator>
                                <Animator animation={MoveIn(-250, 0)}>See you </Animator>
                            </span>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={4}>
                    <Animator animation={batch(Fade(), Sticky())}>
                        <Animator animation={MoveIn(0, -1000)}>
                            <span className="choiceCountryText">Choice your country</span>
                        </Animator>
                        <br /><br /><br />
                        <Animator animation={MoveIn(0, 1000)}>
                            <div className="flag-hexagon-column">
                                <div className="flag-hexagon-row">
                                    <div onClick={() => console.log('1')} className="flag-hexagon">
                                        <img className="flag-img flag-contain" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png" alt="Flag Usa Homepage" />
                                    </div>
                                    <div onClick={() => console.log('2')} className="flag-hexagon">
                                        <img className="flag-img flag-fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" alt="Flag French Homepage" />
                                    </div>
                                    <div onClick={() => console.log('3')} className="flag-hexagon">
                                        <img className="flag-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png" alt="Flag Germany Homepage" />
                                    </div>
                                </div>
                                <div className="flag-hexagon-row">
                                    <div onClick={() => console.log('22')} className="flag-hexagon">
                                        <img className="flag-img flag-fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/800px-Flag_of_Italy.svg.png" alt="Flag Italy Homepage" />
                                    </div>
                                    <div className="flag-hexagon">
                                        <img className="flag-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_Portugal.svg/800px-Flag_of_Portugal.svg.png" alt="Flag Portugal Homepage" />
                                    </div>
                                    <div className="flag-hexagon">
                                        <img className="flag-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_Spain.svg/800px-Flag_of_Spain.svg.png" alt="Flag Spain Homepage" />
                                    </div>
                                </div>
                            </div>
                        </Animator>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
            <br />
            <br />
            <br />
            <h6>You are on https://fluidy.news</h6>
            <div onClick={() => console.log('22')} className="flag-hexagon">

            </div>
        </div>
    )
}

export default Home