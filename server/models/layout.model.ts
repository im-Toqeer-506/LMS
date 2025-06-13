import mongoose, { Schema, Document, Model } from "mongoose";
interface FaqItems {
  question: string;
  answer: string;
}
interface Category extends Document {
  title: string;
}
interface BannerImage extends Document {
  public_id: string;
  url: string;
}
interface Layout extends Document {
  type: string;
  banner: {
    image: BannerImage;
    title: string;
    subtitle: string;
  };
  categories: Category[];
  faq: FaqItems[];
}
const faqSchema = new Schema<FaqItems>({
  question: { type: String },
  answer: { type: String },
});
const categorySchema = new Schema<Category>({
  title: {
    type: String,
  },
});
const bannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { type: String },
});
const LayoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});
const LayoutModel: Model<Layout> = mongoose.model("Layout", LayoutSchema);
export default LayoutModel;