
export default function FailPage(){
  return (
    <div className="max-w-xl mx-auto text-center space-y-4">
      <div className="text-5xl">⚠️</div>
      <h1 className="text-2xl font-semibold">Оплата не была завершена</h1>
      <p className="text-gray-700">Возможные причины: недостаточно средств, срок карты истёк, техническая ошибка.</p>
      <div className="flex justify-center gap-2">
        <a href="/catalog" className="btn-primary">Попробовать снова</a>
        <a href="https://t.me/madebynazarov" target="_blank" className="btn">Связаться с автором</a>
      </div>
    </div>
  )
}
