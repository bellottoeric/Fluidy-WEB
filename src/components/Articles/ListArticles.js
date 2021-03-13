import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: "30%",
		boxShadow: 'none',
		borderRadius: 0,
	},
	content: {
		padding: 24,
	},
	cta: {
		marginTop: 24,
		textTransform: 'initial',
	},
}));

export const NewsCardDemo = React.memo(function NewsCard({ elem }) {
	const styles = useStyles();
	const mediaStyles = useWideCardMediaStyles();
	const textCardContentStyles = useN01TextInfoContentStyles();
	const shadowStyles = useBouncyShadowStyles();

	return (
		<Card className={cx(styles.root, shadowStyles.root)}>
			<CardMedia
				classes={mediaStyles}
				image={elem.img}
			/>
			<CardContent className={styles.content}>
				<TextInfoContent
					classes={textCardContentStyles}
					overline={elem.pubDate}
					heading={elem.title}
					body={elem.author}
				/>
			</CardContent>
		</Card>
	);
});

export default NewsCardDemo