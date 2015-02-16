class ItemsController < ApplicationController
  def index
    return render json: Item.all.to_json
  end
end
