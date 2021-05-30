import React from 'react'

interface Props {
  label: string
  value: string
  edit(label: boolean): void
}

export const Placeholder: React.FC<Props> = ({ label, value, edit })  => (
  <div className="br-b pt15 pb15 flex-c flex-jc-sb">
    <div className="w100 flex-fs flex-column">
      <label className="fc-lb mb5 ffm-bold p0 m0">
        {(label || '').charAt(0).toUpperCase() + label.slice(1)}
      </label>

      <div className="w60">
        {value ? (
          <span className="fc-grey p0 m0">
            {(value || '').toString()}
          </span>
        ) : (
          <span className="fc-grey p0 m0">/</span>
        )}
      </div>

    </div>

    <div className="fc-blue click" onClick={() => edit(true)}>
      <span className=" p0 m0">Edit</span>
    </div>
  </div>
)
