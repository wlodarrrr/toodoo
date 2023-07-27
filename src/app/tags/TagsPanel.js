export default function TagsPanel({ tags, selectedTags, handleTagClick }) {
  return (
    <div className="card">
      <div className=" card-body ">
        <h5 className="text-center">Projects</h5>

        <ul className=" list-group gap-2">
          {tags.map((tag, index) => (
            <li
              key={index}
              className={'badge btn bg-primary' + (selectedTags.includes(tag) ? ' border border-light border-2' : '')}
              onClick={() => handleTagClick(tag)}
            >
              {'@' + tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
