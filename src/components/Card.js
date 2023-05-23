import PropTypes from 'prop-types';

const Card = ({ title, onclickss, children }) => {
  return (
    <div
      className="card mb-3 cursor-pointer"
      onClick={onclickss}
    >
      <div className="card-body py-2 d-flex align-items-center">
          <div className='flex-grow-1'>{title}</div> 
          {children && <div>{children}</div>}
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onclickss: PropTypes.func,
}
Card.defaultProps = {
  children: null,
  onclickss: () => {}
}

export default Card;