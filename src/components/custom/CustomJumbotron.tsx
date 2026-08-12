interface Props {
  title: string;
  description?: string;
}

export const CustomJumbotron = ({ title, description }: Props) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>

      {description && <p className="text-slate-300">{description}</p>}
    </div>
  );
};
