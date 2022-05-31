import s from './LoadingDots.module.css'

const LoadingDots: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-3 text-center w-80 h-80">
      <span className={s.root}>
        <span className={s.dot} key={`dot_1`} />
        <span className={s.dot} key={`dot_2`} />
        <span className={s.dot} key={`dot_3`} />
      </span>
    </div>
  )
}

export default LoadingDots
