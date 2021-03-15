import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


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
    containerCardMedia: {
        width: "70% !important"
    },

}));

const Div = styled.div`
    img, p > img {
        width: 50% !important;
        margin-left: 25%;
        margin-bottom: 5%;
    },
    p, div {
        text-align: left
    },
    h1 {
        text-align: center;
        font-size: 4vh;
    },
    h2 {
        text-align: center;
        font-size: 3.5vh;
    }, 
    h3 {
        text-align: center;
        font-size: 3vh;
    },
    li {
        list-style: none;
        margin: auto
    }
`;

const Article = React.memo(function MusicCard({ elem }) {
    const styles = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    console.log(elem)
    scroll.scrollToTop({
        duration: 1250,
        delay: 100,
        smooth: "true",
        offset: 100
    });
    return (
        <Div className="okkk">
            <Card className={cx(styles.root, shadowStyles.root)}>
                <div className={cx(styles.containerCardMedia)}>
                    <CardMedia
                        className={cx(styles.media, mediaStyles.root)}
                        image={elem.img}
                    />
                </div>
                <CardContent>
                    <TextInfoContent
                        classes={textCardContentStyles}
                        overline={elem.author}
                        heading={HaveTitle(elem)}
                        body={BetterHtml(elem)}
                    />
                </CardContent>
            </Card>
        </Div>
    );
});

function HaveTitle(elem) {
    if (elem.content.indexOf("h1") !== -1)
        return ('')
    else
        return (elem.title)
}

function BetterHtml(elem) {
    //elem.content = elem.content.replaceAll('</div>', "</div><br>")
    elem.content = elem.content.replaceAll('<img', "<br><img")
    elem.content = elem.content.replaceAll('<h2', "<br><Br><h2")
    elem.content = elem.content.replace(/<img alt.*>/g, "")

    if (elem.content.match(/<img.*?src="(.*?)"[^>]+>/g)) {
        for (var i of elem.content.match(/<img.*?src="(.*?)"[^>]+>/g)) {
            elem.content = elem.content.replaceAll(i, i + "<br>")
        }
    }

    elem.content = elem.content.replaceAll('<div></div>', "")
    elem.content = elem.content.replaceAll('<br><br>', "<br>").replaceAll('<br><br>', "<br>").replaceAll('<br><br>', "<br>")

    elem.content = elem.content.replaceAll('min-width:300px;', "")
    return (ReactHtmlParser(elem.content))
}

export default Article