import React, { useState, useRef, useEffect } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import globalConfig from "../config.js"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import ReactHtmlParser from 'react-html-parser';
import ReactPlayer from "react-player";
import styled from 'styled-components';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {
    EmailShareButton,
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const useStyles = makeStyles(() => ({
    root: {
        width: "90vw",
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
    media: {
        borderRadius: 6,
        backgroundSize: "contain",
        backgroundColor: "white",
    },
    shareDiv: {
        display: "flex",
        flexFlow: "row wrap",
        ustifyContent: "center",
        alignItems: "center",
    },
    shareButtonDiv: {
        marginBottom: "2%",
        width: "20vw",
        display: "flex",
    }
}));

const CustomStyle = {
    containerCardMedia: isRowBased => ({
        "width": isRowBased ? '45vw' : '82vw',
    }),
    containerTextInfo: isRowBased => ({
        paddingRight: 0,
        paddingLeft: 0,
    }),
    containerButton: isRowBased => ({
        paddingRight: 0,
        paddingLeft: 0,
    }),

}

const Line = styled.hr`
  color: rgba(0, 0, 0, 0.85);
  margin-left: 0;
  margin-top: 5%;
`;

const Article = React.memo(function MusicCard({ elem }) {
    const styles = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const mediaMatch = window.matchMedia('(min-width: 500px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });

    scroll.scrollToTop({
        duration: 1250,
        delay: 0,
        smooth: "true",
        offset: 0
    });

    return (
        <div>
            <Card className={cx(styles.root, shadowStyles.root)}>
                <div style={CustomStyle.containerCardMedia(matches)}>
                    <CardMedia
                        className={cx(styles.media, mediaStyles.root)}
                        image={elem.img}
                    />
                </div>
                <CardContent style={CustomStyle.containerTextInfo(matches)}>
                    <TextInfoContent
                        classes={textCardContentStyles}
                        overline={elem.author}
                        heading={HaveTitle(elem)}
                        body={BetterHtml(elem)}
                    />
                    <Line />
                    <br />
                    <h3 className="shareItElement"><span>Listen the article</span><span>!</span></h3>
                    <ReactPlayer
                        url={globalConfig.host + elem.sound}
                        width="73vw"
                        height="50px"
                        playing={false}
                        controls={true}
                    />
                    <br />
                    <br />
                    <h3 className="shareItElement"><span>SHARE IT</span><span>!</span></h3>
                    <div className={cx(styles.shareDiv)}>
                        <div className={cx(styles.shareButtonDiv)}>
                            <EmailShareButton url={elem.pathname}>
                                <a style={CustomStyle.containerButton(matches)} href="#" className="r-link ai-element ai-element_type ai-element_typeEmail ai-element6">
                                    <EmailIcon size={32} round={true} />
                                </a>
                                <br />
                            </EmailShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>
                            <TwitterShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typeTwitter ai-element6">
                                    <TwitterIcon size={32} round={true} />
                                </a>
                                <br />
                            </TwitterShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>
                            <FacebookShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typeFacebook ai-element6">
                                    <FacebookIcon size={32} round={true} />
                                </a>
                                <br />
                            </FacebookShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>
                            <LinkedinShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typeLinkedin ai-element6">
                                    <LinkedinIcon size={32} round={true} />
                                </a>
                                <br />
                            </LinkedinShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>
                            <PinterestShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typePinterest ai-element6">
                                    <PinterestIcon size={32} round={true} />
                                </a>
                                <br />
                            </PinterestShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>
                            <RedditShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typeReddit ai-element6">
                                    <RedditIcon size={32} round={true} />
                                </a>
                                <br />
                            </RedditShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>

                            <TelegramShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typeTelegram ai-element6">
                                    <TelegramIcon size={32} round={true} />
                                </a>
                                <br />
                            </TelegramShareButton>
                        </div>
                        <div className={cx(styles.shareButtonDiv)}>
                            <WhatsappShareButton url={elem.pathname}>
                                <a href="#" className="r-link ai-element ai-element_type ai-element_typeWhatsapp ai-element6">
                                    <WhatsappIcon size={32} round={true} />
                                </a>
                                <br />
                            </WhatsappShareButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});

function HaveTitle(elem) {
    if (elem && elem.content && elem.content.indexOf("h1") !== -1)
        return ('')
    else
        return (elem.title)
}

function BetterHtml(elem) {
    elem.content = elem.content.replaceAll('<img', "<br><img")
    elem.content = elem.content.replaceAll('<h2', "<br><Br><h2")
    elem.content = elem.content.replace(/<img alt.*>/g, "").replace(/<img src alt.*>/g, "")

    if (elem.content.match(/<img.*?src="(.*?)"[^>]+>/g)) {
        for (var i of elem.content.match(/<img.*?src="(.*?)"[^>]+>/g)) {
            elem.content = elem.content.replaceAll(i, i + "<br>")
        }
    }

    elem.content = elem.content.replaceAll('<div></div>', "")
    elem.content = elem.content.replaceAll('<p>', "<br><p>").replaceAll('<div>', "<br><div>").replaceAll('<li>', "<br><li>")
    elem.content = elem.content.replaceAll('<br><br>', "<br>").replaceAll('<br><br>', "<br>").replaceAll('<br><br>', "<br>")
    elem.content = elem.content.replaceAll(/{\{.*\}}/g, "")
    elem.content = elem.content.replaceAll('min-width:300px;', "")
    return (ReactHtmlParser(elem.content))
}

export default Article