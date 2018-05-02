class Api::ContactsController < ApplicationController
    # before_action :authenticate_user!

    def index
        @contacts = current_user.contacts.all 
        render json: @contacts
    end

    def show    
        @contact = current_user.contacts.find(params[:id])
        render json: @contact
    end
end
