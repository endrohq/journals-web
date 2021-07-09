import { FC, useEffect, useState } from 'react';
import { NewsEventActivity } from '../../typings';

const wikipediaURI =
  'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max';

interface Props {
  activity: NewsEventActivity[];
}

export const EventItemEntities: FC<Props> = ({ activity }) => {
  const [entities, setEntities] = useState<any[]>([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  async function fetchEntities() {
    try {
      const entities = activity
        .map(activity => activity.statement.entities)
        .flat();
      const parsed = [];
      for (let i = 0; i < entities.length; i++) {
        try {
          const entity = entities[i];
          const url = `${wikipediaURI}&gsrsearch=${entity.entity}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data) {
            const page =
              data?.query?.pages && Object.keys(data?.query?.pages)[0];
            if (page && data?.query?.pages[page]) {
              const wikiEntity = data?.query?.pages[page];
              wikiEntity.entityType = entity.entityType;
              parsed.push(wikiEntity);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      setEntities(parsed);
    } catch (e) {}
  }

  return (
    <div className="mb25">
      <div className="mb15 fw-700 fs-m">Entities</div>
      <div className=" ">
        {entities?.map(item => (
          <div key={item.pageid} className="mr5 mb5 flex-c mb10">
            <div className="img--40 circle mr10">
              <img
                className="img--40 circle image-cover"
                src={item.thumbnail.source}
              />
            </div>
            <div>
              <div className="fw-700">{item.title}</div>
              <div className="fc-gray-500 fs-s">
                {item?.entityType?.toLowerCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
