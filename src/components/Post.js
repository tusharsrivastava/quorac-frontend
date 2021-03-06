import { ArticleCard } from "./ArticleCard"
import { PollCard } from "./PollCard"

export const Post = ({ post, ...rest }) => {
  return post.type === 'post' ? <ArticleCard {...post} {...rest} /> : <PollCard {...post} {...rest} />;
}
